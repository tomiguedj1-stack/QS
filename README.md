# אתר ההורדה של QS

## מבנה
- `index.html`, `style.css`, `app.js` – הדף עצמו. אפשר לערוך טקסטים, צבעים (משתני `:root` ב-CSS) ועיצוב.
- `versions.json` – רשימת הגרסאות. **הגרסה הראשונה ברשימה = האחרונה** והיא זו שהכפתור מוריד.
- `latest.json` – קובץ לעדכון אוטומטי של התוכנה (ראה למטה).

## להוציא גרסה חדשה
1. בונים את ה-exe.
2. מעלים אותו ל-GitHub Releases (Releases ← Draft a new release ← מצרפים את הקובץ).
3. מוסיפים בראש `versions.json` אובייקט חדש עם הקישור לקובץ.
4. מעדכנים את `latest.json`.
5. עושים commit ו-push – האתר מתעדכן לבד.

## איפה לארח (חינם)
**GitHub Pages** (מומלץ): מעלים את התיקייה לריפו, Settings ← Pages ← Branch: main. כתובת: `https://USER.github.io/REPO/`.
את ה-exe עצמם שומרים ב-**GitHub Releases** ולא בתוך הריפו (עד 2GB לקובץ, בלי עלות).
חלופות: Cloudflare Pages, Netlify.

## בדיקה מקומית
פותחים טרמינל בתיקייה ומריצים `python -m http.server 8000`, ואז נכנסים ל-http://localhost:8000
(פתיחה ישירה של index.html לא תעבוד, כי הדפדפן חוסם טעינת JSON מקובץ מקומי).

## עדכון אוטומטי בתוכנה
אם QS בנויה עם Tauri v2: מפעילים את `tauri-plugin-updater`, ב-`tauri.conf.json` מגדירים
`"endpoints": ["https://USER.github.io/REPO/latest.json"]` ו-`pubkey`, ומחתימים את הבנייה
(`tauri signer generate`). התוכנה תבדוק את `latest.json` ותתעדכן כשהגרסה שם גבוהה מהמותקנת.
את ה-`signature` ב-`latest.json` לוקחים מקובץ ה-`.sig` שנוצר בבנייה.
