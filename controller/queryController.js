import * as dboprations from "../config/dboprations.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const qrcode = catchAsyncErrors(async (req, res, next) => {
  let { qrcodeText } = req.body;

  const result = await dboprations.executeQuery(
    "SELECT * FROM items where item_code=@qrcodeText",
    {
      qrcodeText: qrcodeText,
    }
  );

  res.send({
    result: result.recordsets[0],
  });
});
