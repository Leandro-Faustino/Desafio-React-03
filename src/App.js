import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function toAddRepository() {
    api
      .post("/repositories", {
        title: `AQUI DEU CERTO!NOVO REPO ${Date.now()}`,
      })
      .then((response) => {
        setRepositories([...repositories, response.data]);
      });
  }

  async function toRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      const findRepositories = repositories.filter((item) => item.id !== id);

      setRepositories(findRepositories);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => toRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={toAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
