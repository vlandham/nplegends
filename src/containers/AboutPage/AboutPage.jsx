
import React, { PureComponent } from 'react';

export default class AboutPage extends PureComponent {

  renderIntro() {
    return (
      <div className="intro">
        <h2 className="banner">Introduction</h2>
        <p>This project started with seemingly simple, perhaps child-like question.</p>
        <p>Recently, I stumbled on a wonderful article from the National Geographic on <a href="http://phenomena.nationalgeographic.com/2016/06/20/heres-why-national-parks-maps-are-some-of-the-best/">the history of the design of national park maps</a>. I have always loved these maps, and it was great to read specifically about how these beautiful artifacts are made.</p>
        <p>Included in the article is a note on the <a href="https://www.nps.gov/hfc/carto/map-symbols.cfm">multitude of symbols</a> that are used to label points of interest on the maps. This raised a question: </p>
        <p><strong>I wonder which symbols are used the most?</strong></p>
        <p>This project is the result of my attempt to answer that question.</p>
      </div>
    );
  }

  renderDataSources() {
    return (
      <div className="datasource">
        <h2 className="banner">Map Images as Data</h2>
        <p>To answer this question - critical to all humanity - needed an answer. And I could answer it.</p>
        <p><strong>But first I needed a data source.</strong></p>
        <p>Amazingly, the National Park Service <a href="https://www.nps.gov/hfc/cfm/carto.cfm">provides many of their maps online</a>. Unfortunately, the site was having some load issues when I was looking to download maps in bulk.</p>
        <p>Even more amazingly, I came across <a href="http://npmaps.com/">NPMaps</a> - a treasure-trove of over 1,000 National Park Maps supported and maintained by a single individual.</p>
        <p>From NPMaps.com I was able to easily pull down high-resolution PDFs of official NP maps, and I was off and running.</p>
      </div>
    );
  }

  renderImageProcessing() {
    return (
      <div className="imageprocessing">
        <h2 className="banner">Image Processing for Analyzing Maps</h2>
        <p>But how to process these PDFs?</p>
        <p>After some experimentation, I settled on using <a href="https://en.wikipedia.org/wiki/Image_processing">image processing</a> techniques to start to answer my question.</p>
        <p>As an aside, I originally thought I would be able to parse the raw PDFs to extract the symbols directly - but didn't make it very far with this method (let me know if you know how to do this - so I can learn!). </p>
        <p>Because of previous experiences in the image processing domain, I settled on <a href="http://scikit-image.org/">scikit-image</a> for my image analysis needs.</p>
        <p>The image processing pipeline is fairly simple, if not the most elegantly executed algorithm. It follows these basic steps:</p>
        <ul>
          <li>Grab an image and convert it into a matrix of pixel values.</li>
          <li>Filter these values so that only black pixels remain.</li>
          <li>Pull out contiguous "objects" in these values, that we can think of as blobs.</li>
          <li>Filter these blobs to only include square ones (as our symbols are all squares).</li>
          <li>Match these square blobs to a set of master symbol keys to find symbols.</li>
        </ul>

        <p>The master symbol images were generated using the same process on the <a href="https://www.nps.gov/hfc/carto/map-symbols.cfm">Symbols PDF</a>, combined with an <a href="https://github.com/tesseract-ocr/tesseract">OCR tool</a> to extract the symbol labels.</p>
        <p>You can see all this in action in my handy dandy Jupyter Notebook:</p>
        <p><a target="_blank" rel="noopener noreferrer" className="btn btn-primary" href="https://github.com/vlandham/national_parks_map_extract/blob/master/notebook/image_filter_for_icons.ipynb">View Image Processing Notebook</a></p>
        <p>The entire pipeline for the data processing is also <a href="https://github.com/vlandham/national_parks_map_extract">on Github</a>. With these scripts I processed around 80 of the official National Park Services maps and prepared the data for visualizing here.</p>
      </div>
    );
  }

  render() {
    return (
      <div className="AboutPage">
        {this.renderIntro()}
        {this.renderDataSources()}
        {this.renderImageProcessing()}
      </div>
    );
  }
}
