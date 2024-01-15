import { useState, useMemo } from "react";
import Alphabet from "../components/alphabet";
import Head from "next/head";
function Glossary({ keywords }) {
  const categories = [...keywords];
  let unique = [];
  for (let i = 0; i < categories.length; i++) {
    if (unique.indexOf(categories[i].category) === -1) {
      unique.push(categories[i].category);
    }
  }
  const [filter, setFilter] = useState("");

  const filteredAlphabet = useMemo(
    () =>
      keywords.filter((keyword) =>
        keyword.keyword.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, keywords]
  );
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Vazirmatn:wght@100;300;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <div className="container">
        <Alphabet alpha={unique} />
        <div className="search-section">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>
        {unique.map((unit) => {
          return (
            <div key={unit} className="alphabet-section">
              <div id={unit} className="single-alphabet">
                <h2>{unit}</h2>
                {filteredAlphabet.map((keyword) => {
                  return (
                    <div key={keyword.id} className="keyword-section">
                      <div className="keyword-section-inner">
                        <p className="keyword-title">
                          {keyword.keyword} : {keyword.translate}
                        </p>
                        <p>{keyword.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="container-top">
        <a href="#">
          <i className="fas fa-arrow-up top-icon"></i>
        </a>
      </div>
    </>
  );
}
export default Glossary;

export async function getStaticProps() {
  const response = await fetch("http://localhost:3000/api/glossaryAPI");
  const data = await response.json();

  return {
    props: {
      keywords: data,
    },
  };
}
