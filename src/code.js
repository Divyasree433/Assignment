 // const handleSubmit=async(e)=>{
  //     e.preventDefault();
  //     const file=e.target.files[0];
  //     const data=await file.arrayBuffer(file);
  //     const excelfile = XLSX.read(data);
  //     const excelsheet=excelfile.Sheets[excelfile.SheetNames[0]];
  //     const exceljson=XLSX.utils.sheet_to_json(excelsheet)
  //     setExcelData(exceljson);
  // }