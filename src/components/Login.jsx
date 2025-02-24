import Header from "./Header";

const Login = () => {
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/0cf2c109-3af1-4a9d-87d7-aecfac5fe881/web/NP-en-20250217-TRIFECTA-perspective_76dcb6f9-24a4-4224-8132-cb79a5094f75_large.jpg"
          alt="Body-Image"
        />
      </div>
      <form className="w-3/12 absolute  bg-black p-12 my-36 mx-auto right-0 left-0" >
        <input type="text" placeholder="Email Address" className="p-2 m-2"/>
        <input type="password" placeholder="Password" className="p-2 m-2"/>
        <button className="p-4 m-4">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
