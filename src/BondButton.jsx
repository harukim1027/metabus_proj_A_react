function BondButton() {
  const iconbutton = ({ type }) => {
    return (
      <button style={styles.iconbutton}>
        <img src={type} />
      </button>
    );
  };

  const styles = StyleSheet.create({
    iconbutton: {
      margin: 10,
    },
  });
  return { iconbutton };
}

export default BondButton;
