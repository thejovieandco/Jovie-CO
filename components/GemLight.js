"use client";

import { useEffect, useRef } from "react";

// Caustics — the bands of light that form when a beam refracts through a
// faceted stone. Rendered on a WebGL canvas behind the hero content.
// Silently renders nothing if WebGL is unavailable, and holds a single
// still frame when the visitor prefers reduced motion.

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;

  vec2 p = uv;
  p.x *= u_res.x / u_res.y;
  p += u_mouse * 0.09;
  p *= 3.1;

  // Layered distortion folds the plane into filaments of light
  float t = u_time * 0.10;
  for (int i = 1; i < 6; i++) {
    float fi = float(i);
    p.x += 0.32 / fi * sin(fi * 2.4 * p.y + t);
    p.y += 0.30 / fi * cos(fi * 2.1 * p.x + t * 1.13);
  }

  // A high exponent keeps only the bright crests, so the result reads as
  // distinct threads of light rather than an even wash.
  float caustic = 0.5 + 0.5 * sin(p.x + p.y);
  caustic = pow(caustic, 8.0);

  vec3 gold = vec3(0.85, 0.70, 0.40);
  vec3 warm = vec3(1.0, 0.97, 0.90);
  vec3 col = mix(gold, warm, caustic);

  // Strongest toward the upper right, where the hero's own glow sits,
  // and faded at the left edge so it never fights the headline.
  float falloff = smoothstep(0.05, 0.95, uv.x * 0.72 + uv.y * 0.48);
  float alpha = caustic * 0.55 * falloff;

  gl_FragColor = vec4(col * alpha, alpha);
}
`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function GemLight() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true }) ||
      canvas.getContext("experimental-webgl");
    if (!gl) return; // no WebGL — hero simply renders without it

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    // Hold a single frame when motion is unwelcome, and on touch devices —
    // there is no cursor to follow there, so a running loop only costs battery.
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let raf = null;
    let visible = true;
    const start = performance.now();

    function resize() {
      // Cap pixel ratio — the effect is diffuse, so extra density is wasted
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    function draw(now) {
      resize();
      // Ease toward the cursor so movement feels weighted, not twitchy
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 12.0 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced && visible) raf = requestAnimationFrame(draw);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / rect.width - 0.5;
      target.y = (e.clientY - rect.top) / rect.height - 0.5;
    }

    // Stop drawing once the hero scrolls away
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduced && raf == null) raf = requestAnimationFrame(draw);
        if (!visible && raf != null) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const host = canvas.parentElement;
    if (host && !reduced) host.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      if (host) host.removeEventListener("mousemove", onMove);
      if (raf != null) cancelAnimationFrame(raf);
      const lose = gl.getExtension("WEBGL_lose_context");
      if (lose) lose.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className="gem-light" aria-hidden="true" />;
}
