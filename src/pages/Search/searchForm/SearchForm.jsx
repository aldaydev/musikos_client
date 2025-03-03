
import Button from '../../../../components/Forms/Button';
import SearchInstStyle from './SearchInstStyle';
import SearchLocation from './SearchLocation';
import SearchAge from './SearchAge';
import Input from '../../../../components/Forms/Input';
import useSearch from '../../useSearch';


function SearchForm (){

    const {name, setName} = useSearch();

    return(
        <section className="searchForm__container">
            <h2>INSTRUMENTOS Y ESTILOS</h2>
            <form className="search__form">

                <SearchInstStyle/>
                <SearchLocation/>
                <SearchAge/>
                <Input
                    name='name'
                    id='name'
                    value={name}
                    placeholder='Busca por nombre'
                    onChange={(e)=>setName(e.target.value)}
                    // error={emailError}
                    // modClass={emailError && 'error'}
                />

                <Button style={{marginLeft: '10px' }}>CONFIRMAR BÚSQUEDA</Button>
                
            </form>
        </section>
    )
}

export default SearchForm;