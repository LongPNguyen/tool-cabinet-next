import React, { useState } from 'react';
import { useRouter } from 'next/router'

const Quote = ({dates, tool, owner}) => {
    const [formData, setFormData] = useState({ toolId: "", toolImage: "", toolTitle: "", toolStatus: "", owner: "",  name: "", email: "", phone: "", message: "", dates: []})
    const url = "mailto:nguy4227@gmail.com?subject=You have and interested customer&body=Contact info%0d%0aName: " + formData.name + '%0d%0aEmail: ' + formData.email + '%0d%0aPhone: ' + formData.phone + '%0d%0a%0d%0aRequested Dates%0d%0aFrom: ' + dates[0] + '%0d%0aTo: ' + dates[1] + '%0d%0a%0d%0aMessage%0d%0a' + formData.message
    const router = useRouter()

    const postData = async (formData) => {
      try {
        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
  
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
          throw new Error(res.status)
        }
  
        router.push(`/tools/${tool._id}`)
      } catch (error) {
        console.log(error)
      }
    }

    const putData = async (form) => {
      const { id } = router.query
  
      try {
        const res = await fetch(`/api/tools/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {status: "Pending"},
        })
  
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
          throw new Error(res.status)
        }
  
        const { data } = await res.json()
  
        mutate(`/api/tools/${id}`, data, false) // Update the local data without a revalidation
        router.push(`/profile/${pid}/orders`)
      } catch (error) {
        setMessage('Failed to update tool')
      }
    }

    const handleChange = (e) => {
      const target = e.target
      const value = target.value
      const id = target.id
  
      setFormData({
        ...formData,
        [id]: value,
        toolId: tool._id,
        toolImage: tool.images,
        toolTitle: tool.title,
        toolStatus: "Pending",
        dates: dates,
        owner: owner
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      postData(formData)
      putForm()
    }

    return(
        <div className="">
        {/* <!-- Button trigger modal --> */}

        {/* <!-- Modal --> */}
        <div className="modal fade" id="quoteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Request Your Quote</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleSubmit} action={url}>
              <div className="modal-body">
                  <div className="mb-3">
                      <label for="name" className="form-label">Full name</label>
                      <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      />
                  </div>
                  <div className="mb-3">
                      <label for="email" className="form-label">Email address</label>
                      <input
                      type="email"
                      className="form-control" 
                      id="email" 
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      />
                  </div>
                  <div className="mb-3">
                      <label for="phone" className="form-label">Phone number</label>
                      <input 
                      type="phone" 
                      className="form-control" 
                      id="phone" 
                      placeholder="123-456-7890"
                      value={formData.phone}
                      onChange={handleChange}
                      />
                  </div>
                  <div className="mb-3">
                      <label for="message" className="form-label">Message</label>
                      <textarea 
                      className="form-control" 
                      id="message" 
                      rows="3" 
                      placeholder="Hello, I would like to get a quote for this item!"
                      value={formData.message}
                      onChange={handleChange}
                      ></textarea>
                  </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Quote;