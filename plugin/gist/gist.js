/**
 * A plugin which enables rendering gist
 *
 * @author JUN HAN LIN
 */
var RevealGist = window.RevealGist || (function() {

  function adjustHeightWhenComplete(myFrame, myDoc) {
    if (myDoc.readyState === 'complete') {
      var content_height = myFrame.contentWindow.document.documentElement.scrollHeight;
      myFrame.style.height = content_height + 'px';
    } else {
      // This will be continiously called until the iFrame is ready
      setTimeout(function() {
        adjustHeightWhenComplete(myFrame, myDoc);
      });
    }
  }

  document.querySelectorAll("div[data-gist-url]").forEach(function(zone) {

    // Create an iframe, append it to this document where specified
    var gistFrame = document.createElement("iframe");
    gistFrame.setAttribute("width", "100%");
    // gistFrame.id = "gistFrame" + this.props.gistId;


    zone.innerHTML = "";
    zone.appendChild(gistFrame);

    // Create the iframe's document

    var url =  zone.getAttribute('data-gist-url');
    var gistFrameHTML = '<html><body><script type="text/javascript" src=' + url + '></script></body></html>';

    // Set iframe's document with a trigger for this document to adjust the height
    var gistFrameDoc = gistFrame.document;

    if (gistFrame.contentDocument) {
      gistFrameDoc = gistFrame.contentDocument;
    } else if (gistFrame.contentWindow) {
      gistFrameDoc = gistFrame.contentWindow.document;
    }

    gistFrameDoc.open();
    gistFrameDoc.writeln(gistFrameHTML);
    gistFrameDoc.close();

    // adjustHeightWhenComplete(gistFrame, gistFrameDoc);
  });

  // Reprocess equations in slides when they turn visible
  Reveal.addEventListener('ready', function(event) {



  });









})();