import React from "react";
import { Formik, Form } from "formik";
import FormInput from "../inputs/FormInput";
import { memberFormValidationSchema } from "../../schemas/validationSchema";
import CustomButton from "../buttons/CustomButton";
import { useMemberContext } from "../../context/MemberContext";

const MemberForm: React.FC = () => {
  const { dispatch } = useMemberContext();

  const initialValues = {
    name: "",
    title: "",
    age: "",
    email: "",
    mobile: "",
  };
  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form Submitted:", values);
    const age = values.age ? Number(values.age) : 0;

    const newMember = {
      ...values,
      id: new Date().toISOString(),
      status: "Unclaimed" as "Unclaimed",
      age: age,
    };

    dispatch({ type: "ADD_MEMBER", payload: newMember });
    console.log("User added:", newMember);

    try {
      const currentMembers = JSON.parse(
        localStorage.getItem("members") || "[]"
      );
      currentMembers.push(newMember);
      localStorage.setItem("members", JSON.stringify(currentMembers));
    } catch (error) {
      console.error("Error parsing members from localStorage:", error);
    }
  };

  return (
    <div className="max-w-lg  mx-auto  p-6 border border-gray-200 rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold text-center mb-6 text-black">
        Member Registration
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={memberFormValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <FormInput label="Name" name="name" placeholder="Enter your name" />
            <FormInput
              label="Title"
              name="title"
              placeholder="Enter your title"
            />
            <FormInput
              label="Age"
              name="age"
              type="number"
              placeholder="Enter your age"
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            <FormInput
              label="Mobile Number"
              name="mobile"
              placeholder="Enter your mobile number"
            />
            <CustomButton type="submit" label="Submit" className="mt-4 bg-darkgray text-white" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MemberForm;
