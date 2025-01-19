import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  /** ------------   SEARCH in fields by REGEX    ----------------------*/ //for searching through fields
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>, // Use mongoose Filter query
        ),
      });
    }

    return this;
  }

  /** ------------   Filter    ----------------------*/ //exclude the fields like limit sort page number from the query
  filter() {
    const queryObj = { ...this.query }; // copy the query

    //filter and remove
    const excludableFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludableFields.map((el) => delete queryObj[el]); //delete from the obj

    // add to query by removing those field from find({}) and only with the searchquery of anything;
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  /** ------------   SORT    ----------------------*/
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  /** ------------   PAGINATION    ----------------------*/
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  /** ------------   SELECTION     ----------------------*/
  fields() {
    // for select fields
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  /**---------------- To Get the meta data; ie: page, total data etc  --------------------- */
  async countTotal() {
    //20-11
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);

    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
<<<<<<< HEAD

/* // 14-9
 const queryObj = { ...query } //  copying req.query object so that we can mutate the copy object 
 
 let searchTerm = '' // set default value for search term from where it will be checked
 
 // if searchTerm is given, set to the query 
 if (query?.searchTerm) {
   searchTerm = query.searchTerm as string;
 }
 
 
 //  ----  HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  : 
 // { email: { $regex: query.searchTerm, $options: i } }
 // { presentAddress: { $regex: query.searchTerm, $options: i } }
 // { 'name.firstName': { $regex: query.searchTerm, $options: i } }
 
 const searchableFields = ['email', 'name.firstName', 'presentAddress']
 
 // WE ARE DYNAMICALLY DOING IT USING LOOP
 const searchQuery = Student.find({
   $or: searchableFields.map((field) => ({
     [field]: { $regex: searchTerm, $options: 'i' }
   }))
 })
 
 // FILTERING fUNCTIONALITY:
 
 
 // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY
 const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
 excludeFields.forEach((el) => delete queryObj[el]);
 
 
 const filterQuery = searchQuery.find(queryObj)
   .populate('admissionSemester')
   .populate({
     path: 'academicDepartment',
     populate: {
       path: 'academicFaculty',
     },
   });
 
 // SORTING FUNCTIONALITY:
 
 let sort = '-createdAt'; // SET DEFAULT VALUE 
 
 // IF sort  IS GIVEN SET IT
 
 if (query.sort) {
   sort = query.sort as string;
 }
 
 const sortQuery = filterQuery.sort(sort);
 
 // PAGINATION FUNCTIONALITY:
 
 let page = 1; // SET DEFAULT VALUE FOR PAGE 
 let limit = 1; // SET DEFAULT VALUE FOR LIMIT 
 let skip = 0; // SET DEFAULT VALUE FOR SKIP
 
 
 // IF limit IS GIVEN SET IT
 
 if (query.limit) {
   limit = Number(query.limit);
 }
 
 // IF page IS GIVEN SET IT
 
 if (query.page) {
   page = Number(query.page);
   skip = (page - 1) * limit;
 }
 
 const paginateQuery = sortQuery.skip(skip);
 
 const limitQuery = paginateQuery.limit(limit);
 
 
 // FIELDS LIMITING FUNCTIONALITY:
 
 // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH 
 // fields: 'name,email'; // WE ARE ACCEPTING FROM REQUEST
 // fields: 'name email'; // HOW IT SHOULD BE 
 
 let fields = '-__v'; // SET DEFAULT VALUE
 
 if (query.fields) {
   fields = (query.fields as string).split(',').join(' ');
 
 }
 
 const fieldQuery = await limitQuery.select(fields);
 
 return fieldQuery;
 
*/
=======
>>>>>>> 2e5d2b06e69d012a04b7fc55ea3a607012bd2581
