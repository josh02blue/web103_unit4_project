const BASE = "http://localhost:3000/api";

async function request(path, { method = "GET", body, signal } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  // 204 No Content
  return res.status === 204 ? true : res.json();
}

// ===== Cars =====
export function getAllCars({ signal } = {}) {
  return request("/cars", { signal });
}

export function getCar(id, { signal } = {}) {
  return request(`/cars/${id}`, { signal });
}

export function createCar(payload, { signal } = {}) {
  return request("/cars", { method: "POST", body: payload, signal });
}

export function updateCar(id, payload, { signal } = {}) {
  return request(`/cars/${id}`, { method: "PUT", body: payload, signal });
}

export function deleteCar(id, { signal } = {}) {
  return request(`/cars/${id}`, { method: "DELETE", signal });
}