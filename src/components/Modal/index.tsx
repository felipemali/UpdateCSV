import { useContext, useRef, useEffect, useState } from "react";
import "./index.css";
import { UserContext } from "../../context/UserContext";
import IconUpload from "../../assets/img/icon-upload.png";
import { AnimalData } from "../../models/CSVData";
import { useProcess } from "../../api";

const Modal = ({
  data,
  clearData,
}: {
  data: AnimalData[];
  clearData: () => void;
}) => {
  const [input, setInput] = useState("");
  const { isOpen, setIsOpen } = useContext(UserContext);
  const [items, setItems] = useState<AnimalData[]>([]);
  const [isSendModal, setIsSendModal] = useState(false);

  const { postCSV } = useProcess();

  const dialogRef = useRef<HTMLDialogElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleButtonClick = () => {
    const updatedItems = data.map((item) => ({
      ...item,
      label: input,
    }));
    setItems(updatedItems);
    setIsSendModal(true);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isOpen) {
        dialog.showModal();
      } else {
        dialog.close();
        setInput("");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (items.length > 0 && isOpen) {
      postCSV(items);
      setIsOpen(false);
      clearData();
    }
    setIsSendModal(false);
  }, [isSendModal]);

  return (
    <dialog ref={dialogRef} id="dialog">
      <label className="label-login">Rótulo(Opcional)</label>
      <input
        onChange={handleInputChange}
        placeholder="Digite o rótulo..."
        className="input-text"
        type="text"
        value={input}
      />
      <div className="container-button-modal">
        <button
          onClick={() => {
            handleButtonClick();
          }}
        >
          <img src={IconUpload} alt="enviar" /> Enviar
        </button>
      </div>
      <button onClick={() => setIsOpen(false)} aria-label="close" className="x">
        ❌
      </button>
    </dialog>
  );
};

export default Modal;
