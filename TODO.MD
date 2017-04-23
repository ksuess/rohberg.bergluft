**TODO**

+ Navigation, einfach, wie bei Mobile 
https://v4-alpha.getbootstrap.com/components/navbar/#toggler
+ Click auf Blog-Post-Titel auf Startseite sollte auf Blog leiten, nicht auf Einzelseite.
+ srcset Images: Bilder in verschiedenen Scales hinterlegen mit srcset. Dies mit media queries für die jeweiligen Bildschirmgrössen laden lassen.

- Tooltip hinter Logo, ist zu hoch, besser ausrichten oder entfernen
- Logo? "R"? Rohberg senkrecht
- contact-info gestalten. Link in Header setzen.
- contac-info sollte auf kontakt-Formular leiten.
- Zertifikat https www.rohberg.ch



*später*

- Logo invertierung auf Startseite optional machen!
- View summary_view of syndicatable collection anpassen, damit ids / anchors existieren:
	 tal:attributes="id python:item_link.split('/')[-1];"
- Blog: Kategorien anzeigen


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