
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
  renderWeb() {
    return (
      <div className="imageprocessing">
        <h2 className="banner">React for Legendary Sites</h2>
        <p>This front-end was built with a host of tools and packages from the <a href="https://facebook.github.io/react/">React</a> ecosystem including <a href="https://github.com/reactjs/redux">Redux</a> and <a href="https://github.com/ReactTraining/react-router">React Router</a>.</p>

        <p>The source code for the size is <a href="https://github.com/vlandham/nplegends">also on Github</a>.</p>

        <p>React provides a great way to build complex websites (not that this site is too complex) in a modular, componentized way. And Redux is great for keeping data and data access consistent.</p>

        <p>And of course, this site uses <a href="http://d3js.org">D3</a> for visualization, which can be integrated with React in a number of different ways. An interesting challenge for me was getting <a href="https://openseadragon.github.io/">OpenSeaDragon</a> to work with the other tools for creating the zoomable maps. Its not the cleanest code yet, but is functional!</p>
      </div>
    );
  }

  renderLimitations() {
    return (
      <div className="imageprocessing">
        <h2 className="banner">Limitations and Future Work</h2>
        <p>If you puruse the zoomable maps on a particular park page, you can see that, in general, the image processing algorithm does a decent job of finding symbols. But there are plenty of caveats. </p>
        <p>One big assumption my code makes is that the symbols will be consistently the same size in all the maps. Surprisingly, the National Park Services maintain a pretty consistent format, but there are a few instances where the map is scaled to a different size, and so nothing but noise is found. A more robust system would find shapes with mostly square borders no matter the size.</p>
        <p>Another more basic limitation of the current process is that it is unable to distinguish between symbols on the map and symbols in a legend next to the map. Not every map has a legend, and these legends don't appear in a consistent location in the map images. Thus, we are double counting symbols in a portion of the maps.</p>
      </div>
    );
  }

  render() {
    return (
      <div className="AboutPage">
        {this.renderIntro()}
        {this.renderDataSources()}
        {this.renderImageProcessing()}
        {this.renderWeb()}
        {this.renderLimitations()}
      </div>
    );
  }
}
