import dbconnect from "../../databases/connection"
import printingReport from "../../databases/schema";

dbconnect();


const App2 = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const report = await printingReport.find({});
        res.status(200).json({ success: true, data: report });
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: false, message: err.message });
  }
}

export default App2;