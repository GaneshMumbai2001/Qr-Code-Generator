import { useState } from 'react';
import QRCode from 'react-qr-code';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [back, setBack] = useState('#FFFFFF');
  const [fore, setFore] = useState('#000000');
  const [size, setSize] = useState(256);
  const [qrCode, setQrCode] = useState(null);
  const [generated, setGenerated] = useState(false);

  function onGenerate() {
    if (value !== ""){
      setQrCode(
        <QRCode
          title={value}
          value={value}
          bgColor={back}
          fgColor={fore}
          size={size === '' ? 0 : size}
        />
      );
      setGenerated(true);
    } else {
      alert("Value not mentioned");
      setQrCode(null);
      setGenerated(false);
    }
  }

  function downloadQRCode() {
    if (qrCode !== null) {
      const canvas = document.getElementById('qr-code');
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qr-code.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }

  return (
    <div className="App">
      <center>
        <br />
        <br />
        <div className={generated ? 'container generated' : 'container'}>
          <input
            id="qr"
            type="text"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value of Qr-code"
          />
          <br />
          <br />
          <input
            id="qr"
            type="text"
            onChange={(e) => setBack(e.target.value)}
            placeholder="Background color"
          />
          <br />
          <br />
          <input
            id="qr"
            type="text"
            onChange={(e) => setFore(e.target.value)}
            placeholder="Foreground color"
          />
          <br />
          <br />
          <input
            id="qr"
            type="number"
            onChange={(e) =>
              setSize(parseInt(e.target.value === '' ? 0 : e.target.value, 10))
            }
            placeholder="Size of Qr-code"
          />
          <br />
          <br />
          <button
            className='my-button'
            type="submit"
            onClick={onGenerate}
          >
            Generate
          </button>
          <br />
          <br />
          <br />
        </div>
        {qrCode && (
          <div className='qr-container'>
            {qrCode}
            <br />
            <br />
            <button
              className='my-button'
              onClick={downloadQRCode}
            >
              Download QR Code
            </button>
          </div>
        )}
      </center>
    </div>
  );
}

export default App;
