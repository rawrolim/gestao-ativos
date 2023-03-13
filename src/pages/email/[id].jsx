import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const confirm = () => {
    const router = useRouter();
    const { id } = router.query;

    confirmaEmail();

    async function confirmaEmail() {
        if (id !== undefined) {
            await axios.put("/api/usuario", {
                _id: id,
                bloqueado: false,
                motivo_bloqueio: ''
            });
        }
    }

    return (
        <div className="col-12 p-5 text-center">
            <h4 className="mb-5 mt-5">
                E-mail confirmado, já pode fechar a página atual.
            </h4>
        </div>
    );
};

export default confirm;
