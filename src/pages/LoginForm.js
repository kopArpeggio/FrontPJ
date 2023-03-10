import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Swal from "sweetalert2";
import { signIn } from "../apis/rootApi";

export default function LoginForm() {
  const [username, setUsername] = useState("" || undefined);
  const [password, setPassword] = useState("" || undefined);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const api = `http://localhost:3001/api`;

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const login = async (e) => {
    try {
      e.preventDefault();
      const user = await signIn({
        username: username,
        password: password,
      });

      Swal.fire({
        title: "Login Status",
        text: "Sigin Success!",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      }).then(() => {
        localStorage.setItem("token", user?.accessToken);
        window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        title: "Login Status",
        text: "Sigin Filed",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? (
        "Loading"
      ) : (
        <div>
          {" "}
          <Navbar />
          <Container>
            {/* {isLoading ? (
      <p>Loading...</p>
    ) : (
      <p>Data has been successfully fetched</p>
    )} */}
            <Form className="App-login-form font-css " onSubmit={login}>
              <br />
              <Form.Group className="mb-3 font-css ">
                <h1 className="app-login mt-5 mb-5">?????????????????????????????????</h1>
                <Form.Label className="font-usr-pass mb-3">
                  ?????????????????????????????? :
                </Form.Label>
                <Form.Control
                  className="use-pass mb-3"
                  type="username"
                  placeholder=""
                  required
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                <Form.Label className="font-usr-pass mb-3">
                  ?????????????????????????????? :
                </Form.Label>
                <Form.Control
                  className="use-pass mb-3"
                  type="password"
                  placeholder=""
                  required
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <Form.Text className="draw-a-line font-usr-pass">
                  ?????????????????????????????????
                </Form.Text>
                <Button
                  variant="primary"
                  disabled={!username || !password}
                  type="submit"
                  className="submit-black-ground mt-4"
                >
                  ?????????????????????????????????
                </Button>{" "}
              </Form.Group>
            </Form>
          </Container>
        </div>
      )}
    </div>
  );
}
