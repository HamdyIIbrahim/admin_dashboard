import Layout from "@/components/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);
  function getAllCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }
  function saveCatrgories(ev) {
    ev.preventDefault();
    axios.post("/api/categories", { name, parentCategory }).then(() => {
      getAllCategories();
    });
    setName("");
  }
  function deleteCategory(category) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${category.name}`,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#991B1B",
      confirmButtonText: "Yes, Delete!",
      confirmButtonColor: "#1E3A8A",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { _id } = category;
        await axios.delete("/api/categories?_id=" + _id);
        getAllCategories();
      }
    });
  }
  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", value: "" }];
    });
  }
  function handlePropertyNameChange(index,property,newName){
    setProperties(prev=>{
      const properties =[...prev];
      properties[index].name=newName;
      return properties;
    })
  }
  function handlePropertyValuesChange(index,property,newValues){
    setProperties(prev=>{
      const properties =[...prev];
      properties[index].value=newValues;
      return properties;
    })
  }
  function removeProperty(indexToRemove){
    setProperties(prev=>{
      return [...prev].filter((p,pIndex)=>{
        return pIndex !== indexToRemove;
      });
    })
  }
  return (
    <Layout>
      <h1>Categories</h1>
      <label> New categories name</label>
      <form onSubmit={saveCatrgories}>
        <div className="felx gap-1">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(ev) => {
              setName(ev.target.value);
            }}
          />
          <select
            value={parentCategory}
            onChange={(ev) => {
              setParentCategory(ev.target.value);
            }}
          >
            <option value="">no parent category</option>
            {categories?.map((category) => {
              return (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            type="button"
            onClick={addProperty}
            className="btn-secondary text-sm mb-2"
          >
            add new property
          </button>
          {properties.length > 0 &&
            properties.map((property,index) => (
              <div className="flex gap-1 mb-2" key={index}>
                <input
                  type="text"
                  value={property.name}
                  className="mb-0"
                  onChange={(ev)=>handlePropertyNameChange(index,property,ev.target.value)}
                  placeholder="property name (example: color)"
                />
                <input
                  type="text"
                  value={property.values}
                  className="mb-0"
                  onChange={(ev)=>handlePropertyValuesChange(index,property,ev.target.value)}
                  placeholder="value, comma separated"
                />
                <button onClick={()=>removeProperty(index)} className="btn-red">Remove</button>
              </div>
            ))}
        </div>
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td className="font-semibold">Category name</td>
            <td className="font-semibold">Parent category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => {
            return (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.parentCategory.name}</td>
                <td className="flex gap-1">
                  <button className="flex justify-center items-center gap-2 btn-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                    edit
                  </button>
                  <button
                    onClick={(ev) => deleteCategory(category)}
                    className="flex justify-center items-center gap-2 btn-red"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
}
