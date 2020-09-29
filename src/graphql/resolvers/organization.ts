import Company from "../../model/Company.model";

const entity = {
  createOrganization: async function ({ companyInput }, req) {
    if (!req.isAuth) {
      throw new Error("Unauthenticated, access Denied!");
    }
    
    const existingCompany = await Company.findOne({
      organization: companyInput.organization,
    });
    if (existingCompany) {
      const error = new Error("Organization exist already!");
      throw error;
    }
    const argProduct = companyInput.products.map((item) => item.name);
    const argEmployee = companyInput.employees.map((item) => item.name);

    const newOrganization = new Company({
      organization: companyInput.organization,
      products: [],
      address: companyInput.address,
      employees: [],
      marketValue: companyInput.marketValue,
      ceo: companyInput.ceo,
      country: companyInput.country,
    });
    argProduct.map((item) => newOrganization["products"].push({ name: item }));
    argEmployee.map((item) =>
      newOrganization["employees"].push({ name: item })
    );
    const createdOrganization = await newOrganization.save();

    return { ...createdOrganization["_doc"] };
  },

  getOrganizations: async ({ }, req) => {
  
    if (!req.isAuth) {
      throw new Error("Unauthenticated, access Denied!");
    }
    const allCompany = await Company.find({});
    return allCompany;
  },

  getOrganizationByName: async ({ organizationName }, req) => {
    const foundOrganization = await Company.findOne({
      organization: organizationName,
    });
    return { ...foundOrganization["_doc"] };
  },

  updateOrganization: async ({ organizationInfo }, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated, access Denied!");
      }
      const existingCompany = await Company.findOne({
        organization: organizationInfo.organizationNameToUpdate,
      });

      if (!existingCompany) {
        const error = new Error("Organization does not exist!");
        throw error;
      }

      const inProduct = organizationInfo.products.map((item) => item.name);
      const inEmployee = organizationInfo.employees.map((item) => item.name);

      existingCompany["products"].map((item) => {
        if (inProduct.includes(item.name)) {
          inProduct.splice(inProduct.indexOf(item.name), 1);
        }
      });

      existingCompany["employees"].map((item) => {
        if (inEmployee.includes(item.name)) {
          inEmployee.splice(inEmployee.indexOf(item.name), 1);
        }
      });

      inProduct.map((item) => existingCompany["products"].push({ name: item }));
      inEmployee.map((item) =>
        existingCompany["employees"].push({ name: item })
      );

      existingCompany["organization"] = organizationInfo.organization;
      existingCompany["address"] = organizationInfo.address;
      existingCompany["marketValue"] = organizationInfo.marketValue;
      existingCompany["ceo"] = organizationInfo.ceo;
      existingCompany["country"] = organizationInfo.country;
      const updated = await existingCompany.save();
      return { ...updated["_doc"] };
    } catch (error) {
      throw error;
    }
  },

  removeOrganization: async ({organizationName}, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated, access Denied!")
    }
    console.log(organizationName);
    const deleted = await Company.findOneAndDelete({organization: organizationName});

    return deleted;
  },
};

export default entity;
