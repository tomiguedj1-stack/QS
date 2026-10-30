// טוען את versions.json ובונה את הדף. כדי להוסיף גרסה – עורכים רק את versions.json.
document.getElementById("year").textContent = new Date().getFullYear();

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("he-IL");
  } catch (e) {
    return iso;
  }
}

fetch("versions.json", { cache: "no-store" })
  .then((r) => r.json())
  .then((data) => {
    const versions = data.versions || [];
    if (!versions.length) throw new Error("no versions");

    const latest = versions[0]; // הגרסה העליונה ברשימה היא האחרונה
    const btn = document.getElementById("download-btn");
    btn.textContent = "הורד את QS " + latest.version + " ל-Windows";
    btn.href = latest.url;
    btn.removeAttribute("aria-disabled");
    document.getElementById("download-meta").textContent =
      "גרסה " + latest.version + " · " + fmtDate(latest.date) +
      (latest.size ? " · " + latest.size : "");

    const notes = document.getElementById("latest-notes");
    (latest.notes || []).forEach((n) => {
      const li = document.createElement("li");
      li.textContent = n;
      notes.appendChild(li);
    });

    const tbody = document.querySelector("#versions-table tbody");
    versions.forEach((v) => {
      const tr = document.createElement("tr");
      [v.version, fmtDate(v.date), v.size || ""].forEach((t) => {
        const td = document.createElement("td");
        td.textContent = t;
        tr.appendChild(td);
      });
      const td = document.createElement("td");
      const a = document.createElement("a");
      a.href = v.url;
      a.textContent = "הורדה";
      td.appendChild(a);
      tr.appendChild(td);
      tbody.appendChild(tr);
    });
  })
  .catch(() => {
    const btn = document.getElementById("download-btn");
    btn.textContent = "שגיאה בטעינת הגרסאות";
  });
