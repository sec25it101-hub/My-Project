async function refresh() {
  const r = await fetch('/api/status');
  const d = await r.json();
  document.getElementById('waste').textContent = d.waste_kg + ' kg';
  document.getElementById('detections').textContent = d.detections;
  document.getElementById('hotspots').textContent = d.hotspots;
  document.getElementById('pollution').textContent = d.pollution_index;
  document.getElementById('water').textContent = d.water_level + '%';
  document.getElementById('battery').textContent = d.battery + '%';
  updateCollector(d.collector);
}

function updateCollector(active) {
  document.getElementById('collectorBtn').textContent =
    active ? 'Stop Collector' : 'Start Collector';
  document.getElementById('collectorStatus').textContent =
    'Status: ' + (active ? 'Running' : 'Stopped');
}

async function toggleCollector() {
  const r = await fetch('/api/collector', {method:'POST'});
  const d = await r.json();
  updateCollector(d.collector);
}

async function detectPlastic() {
  const input = document.getElementById('image');
  if (!input.files.length) {
    document.getElementById('result').textContent = 'Please select an image first.';
    return;
  }
  const form = new FormData();
  form.append('image', input.files[0]);
  const r = await fetch('/api/detect', {method:'POST', body:form});
  const d = await r.json();
  document.getElementById('result').innerHTML =
    `<b>${d.message}</b><br>Confidence: ${d.confidence}%<br>Image: ${d.image_size}`;
  refresh();
}

refresh();
setInterval(refresh, 5000);
