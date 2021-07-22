import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import FileBase from "react-file-base64";
import { useSession } from "next-auth/client";

const StoreForm = ({ storeForm, pid, forNewStore = true, store }) => {
  const router = useRouter();
  const [session] = useSession()
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    owner: session?.id,
    name: storeForm.name,
    image: storeForm.image,
    email: storeForm.email,
    phone: storeForm.phone,
    address: storeForm.address,
    description: storeForm.description,
    website: storeForm.website
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/stores`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
            "id": store._id,
            "data": JSON.stringify(form)
        },
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/stores`, data, false); // Update the local data without a revalidation
      router.push(`/profile/${pid}/stores`);
    } catch (error) {
      setMessage("Failed to update store");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch("/api/stores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push(`/profile/${pid}/store`);
    } catch (error) {
      setMessage("Failed to add store");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  console.log(form)

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewStore ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
      console.log(errors, message);
    }
  };

  /* Makes sure post info is filled htmlFor data*/
  const formValidate = () => {
    let err = {};
    if (!form.image) err.image = "At least 1 image is required";
    if (!form.name) err.name = "Name is required";
    if (!form.address) err.address = "Address is required";
    if (!form.phone) err.phone = "Phone is required";
    return err;
  };

  return (
    <div className="col-4 d-flex justify-content-start">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <FileBase
            type="file"
            multiple={false}
            required
            onDone={({ base64 }) => setForm({ 
              ...form, image: base64 })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            maxLength="20"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
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
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            aria-describedby="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            aria-describedby="address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="website" className="form-label">
            Website URL
          </label>
          <input
            type="text"
            className="form-control"
            id="website"
            aria-describedby="website"
            name="website"
            value={form.website}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </div>
  );
};

export default StoreForm;
