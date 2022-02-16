import ReCAPTCHA from 'react-google-recaptcha';
const Captcha = () => {
  function onChange(value) {
    console.log('Captcha value:', value);
  }
  return (
    <div>
      <ReCAPTCHA
        sitekey="6LcgZX8eAAAAAE0cFuPqzl5wwGZgRDJaGOlue2Lg"
        onChange={onChange}
      />
    </div>
  );
};

export default Captcha;
