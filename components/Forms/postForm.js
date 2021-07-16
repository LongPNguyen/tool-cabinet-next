import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import FileBase from 'react-file-base64';


const PostForm = ({postForm, pid, user, forNewTool = true}) => {
    const router = useRouter()
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')
    const [form, setForm] = useState({
        ownerId: postForm.ownerId,
        ownerName: postForm.ownerName,
        images: postForm.images,
        title: postForm.title,
        description: postForm.description,
        pricePerDay: postForm.pricePerDay,
        depositPrice: postForm.depositPrice,
        damagePrice: postForm.damagePrice,
        category: postForm.category,
        tags: postForm.tags,
        rating: postForm.rating,
        outDate: postForm.outDate,
        returnDate: postForm.returnDate,
        status: postForm.status,
        featured: postForm.featured 
    })

      /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/tools/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/tools/${id}`, data, false) // Update the local data without a revalidation
      router.push(`/profile/${pid}/post`)
    } catch (error) {
      setMessage('Failed to update tool')
    }
  }
  
    /* The POST method adds a new entry in the mongodb database. */
    const postData = async (form) => {
        try {
          const res = await fetch('/api/tools', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
          })
    
          // Throw error with status code in case Fetch API req failed
          if (!res.ok) {
            throw new Error(res.status)
          }
    
          router.push(`/profile/${pid}/post`)
        } catch (error) {
          setMessage('Failed to add tool')
        }
      }
  
    const handleChange = (e) => {
      const target = e.target
      const value = target.value
      const name = target.name
  
      setForm({
        ...form,
        [name]: value,
        ownerId: postForm.ownerId,
        ownerName: postForm.ownerName,
        rating: postForm.rating,
        outDate: postForm.outDate,
        returnDate: postForm.returnDate,
        status: postForm.status,
        featured: postForm.featured 
      })
    }
  
    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            forNewTool ? postData(form) : putData(form)
        } else {
          setErrors({ errs })
          console.log(errors, message)
        }
      }
  
    /* Makes sure post info is filled htmlFor data*/
    const formValidate = () => {
      let err = {}
      if (!form.images) err.images = 'At least 1 image is required'
      if (!form.title) err.title = 'Title is required'
      if (!form.description) err.description = 'Description is required'
      if (!form.pricePerDay) err.pricePerDay = 'Price per day is required'
      if (!form.category) err.category= 'You must choose a category'
      return err
    }

  return (
    <div className="col-4 d-flex justify-content-start">
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <FileBase
                type='file'
                multiple={false}
                required
                onDone={({base64}) => setForm({ ...form.images, images: base64 })}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input 
            type="text" 
            className="form-control" 
            id="title" 
            aria-describedby="title"
            maxLength="20"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea 
            className="form-control" 
            id="description" 
            aria-describedby="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="pricePerDay" className="form-label">Price/Day</label>
            <input 
            type="number" 
            className="form-control" 
            id="pricePerDay" 
            aria-describedby="ppd"
            name="pricePerDay"
            value={form.pricePerDay}
            onChange={handleChange}
            required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="depositPrice" className="form-label">Deposit price</label>
            <input 
            type="number" 
            className="form-control" 
            id="depositPrice" 
            aria-describedby="deposit"
            name="depositPrice"
            value={form.depositPrice}
            onChange={handleChange}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="damagePrice" className="form-label">Damage waiver amount</label>
            <input 
            type="number" 
            className="form-control" 
            id="damagePrice" 
            aria-describedby="damagePrice"
            name="damagePrice"
            value={form.damagePrice}
            onChange={handleChange}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Category</label>
            <select 
            className="form-control" 
            id="category" 
            aria-describedby="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            >
                <option value="selected">Choose a category</option>
                <option value="Aerial Work Platforms, Ladders & Scaffolding">Aerial Work Platforms, Ladders & Scaffolding</option>
                <option value="Air Compressors & Air Tools">Air Compressors & Air Tools</option>
                <option value="Compaction Equipment">Compaction Equipment</option>
                <option value="Concrete & Masonry">Concrete & Masonry</option>
                <option value="Drills & Power Tools">Drills & Power Tools</option>
                <option value="Earthmoving Equipment">Earthmoving Equipment</option>
                <option value="General Tools">General Tools</option>
                <option value="Generators & Light Towers">Generators & Light Towers</option>
                <option value="Heaters & Propane Equipment">Heaters & Propane Equipment</option>
                <option value="Home Remodeling & Floor Care">Home Remodeling & Floor Care</option>
                <option value="Jacks & Material Handling">Jacks & Material Handling</option>
                <option value="Lawn Equipment">Lawn Equipment</option>
                <option value="Moving Equipment">Moving Equipment</option>
                <option value="Plumbing Tools & Sewer Equipment">Plumbing Tools & Sewer Equipment</option>
                <option value="Pressure Washer & Auto Scrubbers">Pressure Washer & Auto Scrubbers</option>
                <option value="Surface Preparation">Surface Preparation</option>
                <option value="Trucks & Trailers Equipment">Trucks & Trailers</option>
                <option value="Vacuums, Blowers & Air Filtration">Vacuums, Blowers & Air Filtration</option>
                <option value="Water Pumps">Water Pumps</option>
            </select>
        </div>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Tags</label>
            <input 
            type="text" 
            className="form-control" 
            id="tags" 
            aria-describedby="tags"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
</div>
  )
}

export default PostForm
