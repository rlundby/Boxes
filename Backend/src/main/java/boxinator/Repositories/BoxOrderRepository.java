package boxinator.Repositories;

import boxinator.Models.BoxOrder;
import org.springframework.data.repository.CrudRepository;

public interface BoxOrderRepository extends CrudRepository<BoxOrder, Integer> {
}
