import GetProducts from "../../components/GetProducts/GetProducts";
/* import { products } from "../../helpers/Products"; */

function ProductPage() {
  return (
    <div>
      <h1>Todos los productos</h1>
      {/* Renderizamos todos los productos utilizando el componente GetProducts */}
      <GetProducts />
    </div>
  );
}

export default ProductPage;


