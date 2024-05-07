const deleteRequest = async (id: String) => {
    try {
        const res = await fetch(`http://127.0.0.1:3000/api/requests/${id}`, {
            method: "DELETE",
            mode: "no-cors",
        });
        console.log(
            "trying to delete through: ",
            process.env.URL + `/api/requests/${id}`
        );

        if (res.ok) {
            console.log("Delete successful");
        }
    } catch (error) {
        console.log("Error: ", error);
    }
};

export default deleteRequest;
