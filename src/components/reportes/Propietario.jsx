import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Logo from "@/images/Logo.jpg";

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 4,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 1,
    textAlign: "center",
  },
  logo: {
    width: 100, // Aumentar el tamaño del logo
    height: "auto",
    marginBottom: 1,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  address: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 0,
    textAlign: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    border: "1px solid #000", // Añadir borde a la sección
    borderRadius: 5,
  },
  table: {
    display: "table",
    width: "auto",
    height: "auto",
    marginTop: "10",
    //border: "1px solid #000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
  },
  tableColHeader: {
    width: "12.5%",
    backgroundColor: "#f2f2f2",
    padding: 8,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
    borderBottom: "2px solid #000", // Borde inferior más grueso
  },
  tableCol: {
    width: "12.5%",
    padding: 10,
    textAlign: "center",
    fontSize: 8,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
    color: "#777",
  },
  date: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 12,
  },
});

const ReportePDF = ({ vehiculos }) => {
  const nombreEmpresa = process.env.NEXT_PUBLIC_NOMBRE_EMPRESA;
  const direccionEmpresa = process.env.NEXT_PUBLIC_DIRECCION_EMPRESA;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {/* <Image src={Logo} style={styles.logo} /> */}
          <Text style={styles.companyName}>
            {nombreEmpresa || "Nombre no disponible"}
          </Text>
          <Text style={styles.address}>
            {direccionEmpresa || "Dirección no disponible"}
          </Text>
          <Text style={styles.date}>
            Fecha: {new Date().toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Reporte de Vehículos</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Placa</Text>
              <Text style={styles.tableColHeader}>Marca</Text>
              <Text style={styles.tableColHeader}>Modelo</Text>
              <Text style={styles.tableColHeader}>Serial</Text>
              <Text style={styles.tableColHeader}>Color</Text>
              <Text style={styles.tableColHeader}>Máx. Litros</Text>
              <Text style={styles.tableColHeader}>Cédula</Text>
              <Text style={styles.tableColHeader}>Código</Text>
            </View>
            {vehiculos.map((vehiculo, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{vehiculo.placa_car}</Text>
                <Text style={styles.tableCol}>{vehiculo.marca_car}</Text>
                <Text style={styles.tableCol}>{vehiculo.modelo_car}</Text>
                <Text style={styles.tableCol}>{vehiculo.serial_car}</Text>
                <Text style={styles.tableCol}>{vehiculo.color_car}</Text>
                <Text style={styles.tableCol}>{vehiculo.maxlitros_car}</Text>
                <Text style={styles.tableCol}>{vehiculo.cedula_pro}</Text>
                <Text style={styles.tableCol}>{vehiculo.codigo_car}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* <Text style={styles.footer}>
          Este es un reporte generado automáticamente.
        </Text> */}
      </Page>
    </Document>
  );
};

export default ReportePDF;
