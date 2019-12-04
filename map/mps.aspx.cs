using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WebFrame.Utils;
namespace SanLiChaShe.Web.map
{
    public partial class mps : System.Web.UI.Page
    {
        public string suggestId = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            suggestId = Request["suggestId"];
            if (suggestId.IsNullOrEmpty())
            {
                suggestId = "北京";
            }
        }
    }
}