import Button from "../../../components/Forms/Button";

function DashboardAccount (){
    return(

        <section className="dashboard__accountContainer">
            <h2 className='dashboard__accountTitle'>TU CUENTA</h2>
            <Button>ELIMINAR CUENTA</Button>
            <Button>CERRAR SESIÓN</Button>
        </section>
    )
}

export default DashboardAccount;