import React, { useEffect, useState } from "react";
import Layout from "../../../common/Layout";
import UserSidebar from "../../../common/UserSidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { API_URL, token } from "../../../common/config";

const EditCourse = () => {
  const params = useParams();
  const { id } = params;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const courseMetaData = async () => {
    try {
      const response = await fetch(`${API_URL}/courses/meta-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log("Meta data result:", result);

      if (result.status === true || result.status === 200) {
        setCategories(result.categories);
        setLevels(result.levels);
        setLanguages(result.languages);
      } else {
        const error = result.message || "Failed to load metadata";
        toast.error(error);
      }
    } catch (err) {
      toast.error("Something went wrong while loading metadata");
      console.error(err);
    }
  };

  const onSubmit = async (data) => {
    console.log("Form data being submitted:", data);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Update response:", result);

      if (result.status === true || result.status === 200) {
        toast.success(result.message || "Course updated successfully");
        // Navigate after a short delay
        setTimeout(() => {
          navigate("/account/courses");
        }, 1500);
      } else {
        // Handle validation errors
        if (result.errors) {
          Object.keys(result.errors).forEach((key) => {
            setError(key, { message: result.errors[key][0] });
          });
        } else {
          const error = result.message || "Course update failed";
          toast.error(error);
        }
      }
    } catch (err) {
      toast.error("Something went wrong during update");
      console.error("Update error:", err);
    } finally {
      // Always set loading to false
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log("Fetching course with ID:", id);
        const response = await fetch(`${API_URL}/courses/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        console.log("Course data:", result);

        if (result.status === true || result.status === 200) {
          // Reset form with fetched data
          reset({
            title: result.data.title || "",
            category: result.data.category_id || "",
            level: result.data.level_id || "",
            language: result.data.language_id || "",
            description: result.data.description || "",
            sell_price: result.data.price || "",
            cross_price: result.data.cross_price || "",
          });
        } else {
          const error = result.message || "Failed to load course data";
          toast.error(error);

          if (result.errors) {
            Object.keys(result.errors).forEach((key) => {
              setError(key, { message: result.errors[key][0] });
            });
          }
        }
      } catch (err) {
        toast.error("Something went wrong while loading course");
        console.error("Fetch course error:", err);
      }
    };

    if (id) {
      fetchCourse();
      courseMetaData();
    }
  }, [id, reset]);

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
                Edit Course
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-md-12 mt-5 mb-3">
              <div className="d-flex justify-content-between">
                <h2 className="h4 mb-0 pb-0">Edit Course</h2>
              </div>
            </div>
            <div className="col-lg-3 account-sidebar">
              <UserSidebar />
            </div>
            <div className="col-lg-9">
              <div className="row">
                <div className="col-md-7">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card border-0 shadow-log">
                      <div className="card-body p-4">
                        <h4 className="h5 border-bottom pb-3 mb-3">
                          Course Detail
                        </h4>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="title">
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
                        <div className="mb-3">
                          <label className="form-label" htmlFor="category">
                            Category
                          </label>
                          <select
                            className="form-select"
                            id="category"
                            {...register("category", {
                              required: "Category is required",
                            })}
                          >
                            <option value="">Select a Category</option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                          {errors.category && (
                            <small className="text-danger">
                              {errors.category.message}
                            </small>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="level">
                            Level
                          </label>
                          <select
                            className="form-select"
                            id="level"
                            {...register("level", {
                              required: "Level is required",
                            })}
                          >
                            <option value="">Select a Level</option>
                            {levels.map((level) => (
                              <option key={level.id} value={level.id}>
                                {level.name}
                              </option>
                            ))}
                          </select>
                          {errors.level && (
                            <small className="text-danger">
                              {errors.level.message}
                            </small>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="language">
                            Language
                          </label>
                          <select
                            className="form-select"
                            id="language"
                            {...register("language", {
                              required: "Language is required",
                            })}
                          >
                            <option value="">Select a Language</option>
                            {languages.map((lang) => (
                              <option key={lang.id} value={lang.id}>
                                {lang.name}
                              </option>
                            ))}
                          </select>
                          {errors.language && (
                            <small className="text-danger">
                              {errors.language.message}
                            </small>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="description">
                            Description
                          </label>
                          <textarea
                            id="description"
                            placeholder="Description"
                            className="form-control"
                            rows={5}
                            {...register("description")}
                          />
                          {errors.description && (
                            <small className="text-danger">
                              {errors.description.message}
                            </small>
                          )}
                        </div>
                        <h4 className="h5 border-bottom pb-3 mb-3">Pricing</h4>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="sell_price">
                            Sell Price
                          </label>
                          <input
                            type="text"
                            placeholder="Sell Price"
                            className="form-control"
                            {...register("sell_price", {
                              required: "Sell price is required",
                            })}
                          />
                          {errors.sell_price && (
                            <small className="text-danger">
                              {errors.sell_price.message}
                            </small>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="cross_price">
                            Cross Price
                          </label>
                          <input
                            type="text"
                            placeholder="Cross Price"
                            className="form-control"
                            {...register("cross_price", {
                              required: "Cross price is required",
                            })}
                          />
                          {errors.cross_price && (
                            <small className="text-danger">
                              {errors.cross_price.message}
                            </small>
                          )}
                        </div>
                        <button disabled={loading} className="btn btn-primary">
                          {loading ? "Updating..." : "Update"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-md-5"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EditCourse;
