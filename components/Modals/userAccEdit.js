import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import FileBase from "react-file-base64";

const EditProfile = () => {
  const router = useRouter();
  const [session] = useSession();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    email: "",
    bio: "",
    phone: "",
  });

  const postData = async (formData) => {
    const { pid } = router.query;
    try {
      const res = await fetch("/api/users/editUserAcc", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push(`/profile/user/${pid}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const id = target.id;

    setFormData({
      ...formData,
      [id]: value,
      image: session?.user?.image
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(formData);
  };

  return (
    <div className="">
      {/* <!-- Button trigger modal --> */}

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit your information
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <FileBase
                    type="file"
                    multiple={false}
                    required
                    onDone={({ base64 }) =>
                      setFormData({ ...formData.image, image: base64 })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full name
                  </label>
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
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
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
                  <label htmlFor="phone" className="form-label">
                    Phone number
                  </label>
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
                  <label htmlFor="bio" className="form-label">
                    Bio
                  </label>
                  <textarea
                    className="form-control"
                    id="bio"
                    rows="3"
                    placeholder="Hello, I like to rent tools!"
                    value={formData.bio}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
