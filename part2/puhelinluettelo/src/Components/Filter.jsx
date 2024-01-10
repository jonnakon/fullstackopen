const Filter = ({filter, handleFilter}) =>(

    <form>
      <div>
        filter shown with <input 
          value={filter} 
          onChange={handleFilter}
        />
      </div>
    </form>

)

export default Filter