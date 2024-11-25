const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
      backgroundColor: "white",
    },
    hiddenItem: {
      alignItems: "flex-end",
      backgroundColor: "red",
      flex: 1,
      justifyContent: "center",
      paddingRight: 15,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
  });
  