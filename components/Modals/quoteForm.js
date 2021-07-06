import React, { useState } from 'react';

const Quote = ({dates}) => {
    const [postData, setPostData] = useState({ name: "", email: "", phone: "", message: ""})
    const url = "mailto:nguy4227@gmail.com?subject=You have and interested customer&body=Contact info%0d%0aName: " + postData.name + '%0d%0aEmail: ' + postData.email + '%0d%0aPhone: ' + postData.phone + '%0d%0a%0d%0aRequested Dates%0d%0aFrom: ' + dates[0] + '%0d%0aTo: ' + dates[1] + '%0d%0a%0d%0aMessage%0d%0a' + postData.message

    return(
        <div className="">
        {/* <!-- Button trigger modal --> */}
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#quoteModal">
          Request a Quote
        </button>

        {/* <!-- Modal --> */}
        <div class="modal fade" id="quoteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Request Your Quote</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                    <label for="name" class="form-label">Full name</label>
                    <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="John Doe"
                    value={postData.name}
                    onChange={(e)=> setPostData({ ...postData, name: e.target.value })}
                    />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input
                    type="email"
                    class="form-control" 
                    id="email" 
                    placeholder="name@example.com"
                    value={postData.email}
                    onChange={(e)=> setPostData({ ...postData, email: e.target.value })}
                    />
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone number</label>
                    <input 
                    type="phone" 
                    class="form-control" 
                    id="phone" 
                    placeholder="123-456-7890"
                    value={postData.phone}
                    onChange={(e)=> setPostData({ ...postData, phone: e.target.value })}
                    />
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">Message</label>
                    <textarea 
                    class="form-control" 
                    id="message" 
                    rows="3" 
                    placeholder="Hello, I would like to get a quote for this item!"
                    value={postData.message}
                    onChange={(e)=> setPostData({ ...postData, message: e.target.value })}
                    ></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <a type="button" class="btn btn-primary" href={url}>Submit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Quote;