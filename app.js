// טוען את versions.json ובונה את הדף. כדי להוסיף גרסה, עורכים רק את versions.json.
// שדות לכל גרסה: version, date, url, notes, appSize (גודל התוכנה אחרי ההתקנה, למשל "5.7 MB")
document.getElementById("year").textContent = new Date().getFullYear();

// טקסט באנגלית/מספרים (למשל "5.7 MB") שמוצג נכון בתוך עברית
function ltr(text) {
  const span = document.createElement("span");
  span.className = "ltr";
  span.textContent = text;
  return span;
}

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
    btn.href = latest.url;
    btn.removeAttribute("aria-disabled");

    const meta = document.getElementById("download-meta");
    meta.textContent = "גרסה ";
    meta.appendChild(ltr(latest.version));
    if (latest.appSize) {
      meta.append(" · ");
      meta.appendChild(ltr(latest.appSize));
    }

    const notes = document.getElementById("latest-notes");
    (latest.notes || []).forEach((n) => {
      const li = document.createElement("li");
      li.textContent = n;
      notes.appendChild(li);
    });

    const table = document.getElementById("versions-table");
    if (!versions.some((v) => v.appSize)) table.classList.add("no-size");

    const tbody = table.querySelector("tbody");
    versions.forEach((v) => {
      const tr = document.createElement("tr");
      const cells = [v.version, fmtDate(v.date), v.appSize || ""];
      cells.forEach((t, i) => {
        const td = document.createElement("td");
        if (i === 2) td.className = "col-size";
        if (i === 0 || i === 2) td.appendChild(ltr(t));
        else td.textContent = t;
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
    document.querySelector("#download-btn span").textContent = "שגיאה בטעינת הגרסאות";
    document.getElementById("download-meta").textContent = "רענן את הדף או נסה שוב מאוחר יותר.";
  });
