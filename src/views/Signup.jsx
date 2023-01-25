
import {LockClosedIcon} from "@heroicons/react/20/solid";
import {useState} from "react";
import {API} from "../backend";
import { signup } from "../helper/authApis";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const teams = ['none', 'tech', 'business', 'ops', 'sales', 'finance'];
    const [values , setValues] = useState({
        name : "",
        email : "",
        password : "",
        team : ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = name => event => {
        setError("");
        setValues({...values , [name] : event.target.value});
    };

    const onSubmit = () => {
      setLoading(true);
      signup(values).then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          navigate("/signin");
        }
      })
      .catch((err) => {
        setError(err);
      }
      );
      setLoading(false);
    };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
          <img
              className="mx-auto h-40 w-auto"
              src="https://i.ibb.co/4VGhDzW/logo.png"
              alt="Resolver.One LOGO"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up to your account
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
            <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  onChange={handleChange("name")}
                  autoComplete="name"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  onChange={handleChange("email")}
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange("password")}
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>

                <div>
                    <label htmlFor="team" className="sr-only">
                        Team
                    </label>
                    <select 
                        id="team"
                        name="team"
                        onChange={handleChange("team")}
                        value={values.team}
                        autoComplete="team"
                        placeholder="Team"
                        required
                        className="relative block w-full rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                        {teams.map((team) => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                </div>
            )}

            {loading && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Loading!</strong>
                            <span className="block sm:inline">Please wait...</span>
                                </div>
            )}

            <div>
              <button
                onClick={onSubmit}
                className="bg-indigo-700 group relative flex w-full justify-center rounded-md border py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}