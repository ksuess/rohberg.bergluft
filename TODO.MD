**TODO**


- contac-info sollte auf kontakt-Formular leiten. Im englischen Teil funktionierts noch nicht. Eventuell die Seite für 404 überschreiben.
- Zertifikat https www.rohberg.ch
- Bilder im Artikel responsive machen
- Shariff konfigurierbar machen
- summary view mit Datum




*später*

- View summary_view of syndicatable collection anpassen, damit ids / anchors existieren:
	 tal:attributes="id python:item_link.split('/')[-1];"
- Blog: Kategorien anzeigen
- Tooltip hinter Logo, ist zu hoch, besser ausrichten oder entfernen
- Shariff: Tags mitgeben


*noch später*

- TODO: Facebook

- (-) TinyMCE: 
{
    ...
	, 
    "inline": {
        "inline": "span", 
        "classes": "inline_link"
    }
}
- (-) data-bundle Javscript in index.html
- (-) Links von Proxy konvertieren lassen von roh.rohberg.ch in localhost:3000 (Derzeit quick and dirty mit Javascript)



Unterscheidung debug-mode und production-mode
# development-css = ++theme++rohberg.bergluft/scss/styles.scss
# production-css = ++theme++rohberg.bergluft/scss/styles.css