import Query from "../modals/query.modal.js";

class QueryService {
    async createQuery(data) {
        const newQuery = new Query(data);
        return await newQuery.save();
    }

    async getAllQueries() {
        return await Query.find().populate('bookingId userId busBookingId');
    }
}

export default new QueryService();