from app.core.database import SessionLocal

from ml.trainer import ModelTrainer


def main() -> None:
    print("=" * 60)
    print("Drug Price Prediction Model Trainer")
    print("=" * 60)

    with SessionLocal() as db:
        trainer = ModelTrainer(db)
        trainer.train_all()

    print("=" * 60)
    print("Training completed successfully.")
    print("=" * 60)


if __name__ == "__main__":
    main()