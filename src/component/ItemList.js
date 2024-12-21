import { useState } from "react";
import Modal from "./Modal";
import { useCategories } from "./CategoriesContext";
import { UPDATEDATA, DELETEDATA } from "./Router.js";

function FactList({ facts, currentPage, setFacts, pageSize }) {
  // 현재 페이지에 해당하는 items만 slice로 추출
  const startIndex = currentPage * pageSize;
  const currentPageFacts = facts.slice(startIndex, startIndex + pageSize);
  console.log(facts);

  return (
    <section>
      <ul className="facts-list">
        {currentPageFacts.map((f) => (
          <Fact key={f.id} setFacts={setFacts} fact={f} />
        ))}
      </ul>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const CATEGORIES = useCategories(); // CATEGORIES를 가져옴

  // 상태 초기화
  const [intersting, setInteresting] = useState(
    parseInt(fact.votesInteresting, 10)
  );
  const [mindBlowing, setMindBlowing] = useState(
    parseInt(fact.votesMindBlowing, 10)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [userNote, setUserNote] = useState("");

  // 모달 열기/닫기 함수
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // 사용자 노트 업데이트 함수
  const handleNoteChange = (e) => setUserNote(e.target.value);

  // 우클릭 삭제 처리
  const handleRightClick = (event, id) => {
    event.preventDefault();
    if (window.confirm("Delete?")) {
      DELETEDATA(id, setFacts);
    }
  };

  const handleVoteClick = async (factId, voteType) => {
    const voteStateUpdater =
      voteType === "interesting" ? setInteresting : setMindBlowing;
    const currentVotes = voteType === "interesting" ? intersting : mindBlowing;

    // 상태 업데이트
    const newCount = currentVotes + 1;
    voteStateUpdater(newCount);

    // 서버 요청 (비동기 처리)
    await UPDATEDATA(
      factId,
      `votes${voteType.charAt(0).toUpperCase() + voteType.slice(1)}`,
      newCount
    );
  };

  return (
    <>
      <li
        className="fact"
        onContextMenu={(event) => handleRightClick(event, fact.id)}
      >
        <p onClick={openModal}>
          {fact.text}
          {fact.source && (
            <a
              className="source"
              href={fact.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              (Source)
            </a>
          )}
        </p>
        <span
          className="tag"
          style={{
            backgroundColor: CATEGORIES.find(
              (cat) => cat.name === fact.category
            ).color,
          }}
        >
          {fact.category}
        </span>
        <div className="vote-buttons">
          <button onClick={() => handleVoteClick(fact.id, "interesting")}>
            👍 {intersting}
          </button>
          <button onClick={() => handleVoteClick(fact.id, "mindBlowing")}>
            ❤️ {mindBlowing}
          </button>
        </div>
      </li>

      {/* 모달 */}
      {modalOpen && (
        <Modal
          fact={fact}
          userNote={userNote}
          onNoteChange={handleNoteChange}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default FactList;
