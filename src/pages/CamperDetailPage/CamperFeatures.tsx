import type { Camper } from '../../lib/type/camper';
import styles from './CamperFeatures.module.css';

interface CamperFeaturesProps {
    camper: Camper;
}

const CamperFeatures: React.FC<CamperFeaturesProps> = ({ camper }) => {
    const equipmentItems: { label: string; available: boolean }[] = [
        { label: camper.transmission === 'automatic' ? 'Automatic' : 'Manual', available: true },
        { label: 'AC', available: camper.AC },
        { label: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1), available: true },
        { label: 'Kitchen', available: camper.kitchen },
        { label: 'TV', available: camper.TV },
        { label: 'Bathroom', available: camper.bathroom },
        { label: 'Radio', available: camper.radio },
        { label: 'Refrigerator', available: camper.refrigerator },
        { label: 'Microwave', available: camper.microwave },
        { label: 'Gas', available: camper.gas },
        { label: 'Water', available: camper.water },
    ];

    const activeEquipment = equipmentItems.filter((item) => item.available);

    const formLabels: Record<string, string> = {
        alcove: 'Alcove',
        fullyIntegrated: 'Fully Integrated',
        panelTruck: 'Panel Truck',
    };

    return (
        <div className={styles.features}>
            <div className={styles.tags}>
                {activeEquipment.map((item) => (
                    <span key={item.label} className={styles.tag}>
                        {item.label}
                    </span>
                ))}
            </div>

            <div className={styles.details}>
                <h3 className={styles.detailsTitle}>Vehicle details</h3>
                <div className={styles.divider} />
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <td className={styles.label}>Form</td>
                            <td className={styles.value}>{formLabels[camper.form] || camper.form}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>Length</td>
                            <td className={styles.value}>{camper.length}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>Width</td>
                            <td className={styles.value}>{camper.width}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>Height</td>
                            <td className={styles.value}>{camper.height}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>Tank</td>
                            <td className={styles.value}>{camper.tank}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>Consumption</td>
                            <td className={styles.value}>{camper.consumption}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CamperFeatures;
