import ReCAPTCHA from 'react-google-recaptcha';
const Captcha = () => {
  function onChange(value) {
    console.log('Captcha value:', value);
  }
  return (
    <div>
      <ReCAPTCHA
        sitekey="6LcDeZ4eAAAAACi0gyhj3J47U5CLmDPtF5tJwnWv"
        onChange={onChange}
      />
    </div>
  );
};

export default Captcha;
