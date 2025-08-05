import React from "react";
import Layout from "../../../common/Layout";
import UserSidebar from "../../../common/UserSidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { API_URL, token } from "../../../common/config";

const CreateCourse = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_URL}/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (result.status === true || result.status === 200) {
        toast.success(result.message || "Course Create successfully");
        navigate("/account/courses/edit/" + result.data.id);
      } else {
        const error = result.message || "Course Creation Faild failed";
        setError("email", { message: error });
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };
  return (
    <Layout>
      <section className="section-4">
        <div className="container pb-5 pt-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/account">Account</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Create Course
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-md-12 mt-5 mb-3">
              <div className="d-flex justify-content-between">
                <h2 className="h4 mb-0 pb-0">Create Course</h2>
              </div>
            </div>
            <div className="col-lg-3 account-sidebar">
              <UserSidebar />
            </div>
            <div className="col-lg-9">
              <div className="row">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="card border-0 shadow-log">
                    <div className="card-body p-4">
                      <div className="mb-3">
                        <label htmlFor="title" className="">
                          Title
                        </label>
                        <input
                          type="text"
                          placeholder="Title"
                          className="form-control"
                          {...register("title", {
                            required: "Title is required",
                          })}
                        />
                        {errors.title && (
                          <small className="text-danger">
                            {errors.title.message}
                          </small>
                        )}
                      </div>
                      <button className="btn btn-primary">Continue</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CreateCourse;
