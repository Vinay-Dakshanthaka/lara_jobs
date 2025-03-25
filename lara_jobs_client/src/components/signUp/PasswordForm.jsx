import { Formik, Field, Form } from "formik";

const PasswordForm = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-sm p-6 border rounded-lg">
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          onSubmit={(values) => console.log("Submitted", values)}
        >
          <Form>
            <div className="mb-4">
              <Field
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default PasswordForm;
