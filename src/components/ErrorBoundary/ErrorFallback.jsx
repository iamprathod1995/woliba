import { LOADER } from "../../utils/image-constannts";

const ErrorFallback = ({ error }) => {
    return (
        <div
            role="alert"
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px"
                }}
            >
                <img src={LOADER} alt="loading" style={{
                   
                    width: "100px"
                }}/>

                <h5>Something went wrong</h5>

                <p style={{ color: "red" }}>
                    {error.message}
                </p>
            </div>
        </div>
    );
};

export default ErrorFallback;