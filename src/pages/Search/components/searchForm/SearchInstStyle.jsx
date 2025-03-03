import MultiSelector from "../../../../components/Forms/MultiSelector";
import { UseSearchContext } from "../../../../context/SearchContext";
import useSearch from "../../useSearch";

const SearchInstStyle = () => {

    const {setStyles, setInstruments} = useSearch();
    const {allStyles, allInstruments} = UseSearchContext();

    return(
        <article>
            <MultiSelector
                options={allInstruments && allInstruments}
                setSelection={setInstruments}
                title='Buscar por instrumento'
            />
            <MultiSelector
                options={allStyles && allStyles}
                setSelection={setStyles}
                title='Buscar por estilo'
            />
        </article>
    )
}

export default SearchInstStyle;