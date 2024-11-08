import React, { useEffect, useState } from "react";
import api from "../../constants/api";

const TestimonialSection = () => {

	const [contentTab, setContentTab] = useState([]);

	const getTabContent = () => {
	  api
		.get('/content/getAboutTab')
		.then((res) => {
		  setContentTab(res.data.data); 
		})
		.catch((error) => {
		  console.error('Error fetching menu:', error);
		});
	};
	const formatTextWithLineBreaks = (input) => {
		let tempDiv = document.createElement("div");
		tempDiv.innerHTML = input;
		const textContent = tempDiv.textContent || tempDiv.innerText || "";
		return textContent.replace(/\n/g, "<br />");
	  };
	useEffect(() => {
	  getTabContent();
	  }, []);
  return (
    <>
	<div className="row">
  {Array.isArray(contentTab) && contentTab.map((item, index) => (
  <div key={index} className="col-lg-6 col-md-6 mb-30">
    <div class="comment-list">
      <div class="comment">
        <div class="comment-body">
          <div class="comment-author vcard">
            <span class="fn">
		{item.title}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: item.description ? formatTextWithLineBreaks(item.description) : '' }} />
          </div>


      </div>
    </div>
  </div>
  	))}


</div>

    </>
  );
};

export default TestimonialSection;
